import crypto from "crypto";
import jwt from "jsonwebtoken";

import ContactOtpModel from "../../models/ContactOtpModel/ContactOtpModel.js";

import { sendMail } from "../mailServices/mailService.js";

// =====================================
// Constants
// =====================================

const OTP_EXPIRY_MINUTES = 5;

const VERIFICATION_TOKEN_EXPIRY = "10m";

const MAX_ATTEMPTS = 5;

const RESEND_WAIT_SECONDS = 60;

// =====================================
// Normalize Email
// =====================================

function normalizeEmail(
    email: string,
): string {
    return email
        .trim()
        .toLowerCase();
}

// =====================================
// Generate 6 Digit OTP
// =====================================

function generateOtp(): string {
    return crypto
        .randomInt(100000, 1000000)
        .toString();
}

// =====================================
// Hash OTP
// =====================================

function hashOtp(
    otp: string,
): string {
    return crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
}

// =====================================
// SEND CONTACT OTP
// =====================================

export const sendContactOtpService =
    async (
        email: string,
    ) => {
        const normalizedEmail =
            normalizeEmail(email);

        // =====================================
        // Validation
        // =====================================

        if (!normalizedEmail) {
            throw new Error(
                "Email is required",
            );
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            throw new Error(
                "Please enter a valid email address",
            );
        }

        // =====================================
        // Check Recent OTP
        // =====================================

        const existingOtp =
            await ContactOtpModel.findOne({
                email: normalizedEmail,
            }).sort({
                createdAt: -1,
            });

        if (existingOtp) {
            const createdAt =
                new Date(
                    existingOtp.createdAt,
                ).getTime();

            const currentTime =
                Date.now();

            const difference =
                currentTime - createdAt;

            const waitTime =
                RESEND_WAIT_SECONDS * 1000;

            if (difference < waitTime) {
                const remainingSeconds =
                    Math.ceil(
                        (waitTime - difference) /
                        1000,
                    );

                throw new Error(
                    `Please wait ${remainingSeconds} seconds before requesting another OTP.`,
                );
            }
        }

        // =====================================
        // Delete Old OTP
        // =====================================

        await ContactOtpModel.deleteMany({
            email: normalizedEmail,
        });

        // =====================================
        // Generate OTP
        // =====================================

        const otp =
            generateOtp();

        const otpHash =
            hashOtp(otp);

        // =====================================
        // Expiry
        // =====================================

        const expiresAt =
            new Date(
                Date.now() +
                OTP_EXPIRY_MINUTES *
                60 *
                1000,
            );

        // =====================================
        // Save OTP
        // =====================================

        await ContactOtpModel.create({
            email: normalizedEmail,

            otpHash,

            expiresAt,

            attempts: 0,

            verified: false,
        });

        // =====================================
        // OTP Email
        // =====================================

        const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>HireComfort Email Verification</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f5f7fb;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <div
    style="
      max-width:600px;
      margin:40px auto;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 20px rgba(0,0,0,0.08);
    "
  >

    <!-- Header -->

    <div
      style="
        padding:25px;
        text-align:center;
        background:#eef6ff;
      "
    >

      <h2
        style="
          margin:0;
          color:#1967d2;
        "
      >
        HireComfort
      </h2>

    </div>

    <!-- Content -->

    <div
      style="
        padding:35px 30px;
      "
    >

      <h3
        style="
          margin-top:0;
          color:#222222;
        "
      >
        Verify Your Email
      </h3>

      <p
        style="
          color:#555555;
          line-height:1.6;
        "
      >
        Thank you for contacting HireComfort.
        Please use the following OTP to verify
        your email address.
      </p>

      <!-- OTP -->

      <div
        style="
          margin:30px 0;
          padding:25px;
          text-align:center;
          background:#f5f7fb;
          border-radius:10px;
        "
      >

        <div
          style="
            font-size:36px;
            font-weight:bold;
            letter-spacing:8px;
            color:#1967d2;
          "
        >
          ${otp}
        </div>

        <p
          style="
            margin:12px 0 0;
            color:#777777;
            font-size:14px;
          "
        >
          This OTP is valid for
          ${OTP_EXPIRY_MINUTES} minutes.
        </p>

      </div>

      <p
        style="
          color:#777777;
          font-size:14px;
          line-height:1.6;
        "
      >
        If you did not request this OTP,
        please ignore this email.
      </p>

    </div>

    <!-- Footer -->

    <div
      style="
        padding:20px;
        text-align:center;
        background:#f8f9fa;
        color:#888888;
        font-size:13px;
      "
    >
      © ${new Date().getFullYear()}
      HireComfort. All rights reserved.
    </div>

  </div>

</body>
</html>
`;

        // =====================================
        // Send OTP Email
        // =====================================

        await sendMail({
            to: normalizedEmail,

            subject:
                "HireComfort - Email Verification OTP",

            html,
        });

        // =====================================
        // Response
        // =====================================

        return {
            success: true,

            message:
                "OTP has been sent to your email address.",
        };
    };

// =====================================
// VERIFY CONTACT OTP
// =====================================

export const verifyContactOtpService =
    async (
        email: string,
        otp: string,
    ) => {
        const normalizedEmail =
            normalizeEmail(email);

        const cleanOtp =
            String(otp).trim();

        // =====================================
        // Validation
        // =====================================

        if (!normalizedEmail) {
            throw new Error(
                "Email is required",
            );
        }

        if (!cleanOtp) {
            throw new Error(
                "OTP is required",
            );
        }

        if (!/^\d{6}$/.test(cleanOtp)) {
            throw new Error(
                "OTP must be 6 digits",
            );
        }

        // =====================================
        // Find OTP
        // =====================================

        const otpRecord =
            await ContactOtpModel.findOne({
                email: normalizedEmail,
            }).sort({
                createdAt: -1,
            });

        if (!otpRecord) {
            throw new Error(
                "OTP not found. Please request a new OTP.",
            );
        }

        // =====================================
        // Already Verified
        // =====================================

        if (otpRecord.verified) {
            throw new Error(
                "OTP has already been verified.",
            );
        }

        // =====================================
        // Check Expiry
        // =====================================

        if (
            new Date(
                otpRecord.expiresAt,
            ).getTime() <= Date.now()
        ) {
            await ContactOtpModel.deleteOne({
                _id: otpRecord._id,
            });

            throw new Error(
                "OTP has expired. Please request a new OTP.",
            );
        }

        // =====================================
        // Check Attempts
        // =====================================

        if (
            otpRecord.attempts >=
            MAX_ATTEMPTS
        ) {
            await ContactOtpModel.deleteOne({
                _id: otpRecord._id,
            });

            throw new Error(
                "Too many incorrect attempts. Please request a new OTP.",
            );
        }

        // =====================================
        // Compare OTP
        // =====================================

        const enteredOtpHash =
            hashOtp(cleanOtp);

        if (
            enteredOtpHash !==
            otpRecord.otpHash
        ) {
            otpRecord.attempts += 1;

            await otpRecord.save();

            const remainingAttempts =
                MAX_ATTEMPTS -
                otpRecord.attempts;

            if (remainingAttempts <= 0) {
                await ContactOtpModel.deleteOne({
                    _id: otpRecord._id,
                });

                throw new Error(
                    "Too many incorrect attempts. Please request a new OTP.",
                );
            }

            throw new Error(
                `Invalid OTP. ${remainingAttempts} attempt(s) remaining.`,
            );
        }

        // =====================================
        // Mark Verified
        // =====================================

        otpRecord.verified =
            true;

        await otpRecord.save();

        // =====================================
        // JWT Secret
        // =====================================

        const JWT_SECRET =
            process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            throw new Error(
                "JWT_SECRET is not configured",
            );
        }

        // =====================================
        // Create Verification Token
        // =====================================

        const verificationToken =
            jwt.sign(
                {
                    email:
                        normalizedEmail,

                    purpose:
                        "contact-email-verification",
                },

                JWT_SECRET,

                {
                    expiresIn:
                        VERIFICATION_TOKEN_EXPIRY,
                },
            );

        // =====================================
        // Return
        // =====================================

        return {
            success: true,

            message:
                "Email verified successfully",

            verificationToken,
        };
    };