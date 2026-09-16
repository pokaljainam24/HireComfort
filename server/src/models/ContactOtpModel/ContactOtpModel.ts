import mongoose, {
    Schema,
    Document,
} from "mongoose";

// =====================================
// Interface
// =====================================

export interface IContactOtp
    extends Document {
    email: string;
    otpHash: string;
    expiresAt: Date;
    attempts: number;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// =====================================
// Schema
// =====================================

const ContactOtpSchema =
    new Schema<IContactOtp>(
        {
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                index: true,
            },

            otpHash: {
                type: String,
                required: true,
            },

            expiresAt: {
                type: Date,
                required: true,
                index: true,
            },

            attempts: {
                type: Number,
                default: 0,
            },

            verified: {
                type: Boolean,
                default: false,
            },
        },
        {
            timestamps: true,
        },
    );

// =====================================
// TTL
// OTP automatically deleted after expiry
// =====================================

ContactOtpSchema.index(
    {},
    {
        expireAfterSeconds: 0,
    },
);

// =====================================
// Model
// =====================================

const ContactOtpModel =
    mongoose.model<IContactOtp>(
        "ContactOtp",
        ContactOtpSchema,
    );

export default ContactOtpModel;