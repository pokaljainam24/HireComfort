import ContactMaster from "../../models/ContactModel/ContactModel.js";
import { sendMail } from "../mailServices/mailService.js";

export type IContactMaster = InstanceType<typeof ContactMaster>;

// =====================================
// HTML ESCAPE
// =====================================

function escapeHtml(value: string = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =====================================
// CREATE CONTACT
// =====================================

export async function createContactService(
  contactData: Partial<IContactMaster>,
) {
  try {
    // =====================================
    // VALIDATION
    // =====================================

    // Name
    if (!contactData.name?.trim()) {
      throw new Error("Name is required");
    }

    // Email
    if (!contactData.email?.trim()) {
      throw new Error("Email is required");
    }

    // Phone
    if (!contactData.phone?.trim()) {
      throw new Error("Phone is required");
    }

    // Subject
    if (!contactData.subject?.trim()) {
      throw new Error("Subject is required");
    }

    // Created By
    if (!contactData.createdBy?.trim()) {
      throw new Error("Created by is required");
    }

    // =====================================
    // CREATE CONTACT
    // =====================================

    const contact = new ContactMaster({
      name: contactData.name.trim(),

      company: contactData.company?.trim() || "",

      email: contactData.email.trim().toLowerCase(),

      phone: contactData.phone.trim(),

      subject: contactData.subject.trim(),

      isActive: true,

      isDisplay: true,

      createdBy: contactData.createdBy.trim(),

      updatedBy: null,

      deleteAt: null,

      deleteBy: null,
    });

    const savedContact = await contact.save();

    // =====================================
    // SEND EMAILS
    // =====================================

    try {
      await Promise.all([
        sendCustomerConfirmationEmail(savedContact),
        sendAdminNotificationEmail(savedContact),
      ]);

      console.log("Contact emails sent successfully");
    } catch (emailError) {
      /*
       * Contact is already saved in MongoDB.
       * Therefore email failure should not make
       * contact submission fail.
       */

      console.error(
        "Contact created but email sending failed:",
        emailError,
      );
    }

    return savedContact;
  } catch (error) {
    console.error("Error creating Contact:", error);

    throw error;
  }
}

// =====================================
// CUSTOMER CONFIRMATION EMAIL
// =====================================

async function sendCustomerConfirmationEmail(
  contact: IContactMaster,
) {
  const customerName = escapeHtml(contact.name);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Thank You for Your Query</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f6f8;
    font-family:Arial, Helvetica, sans-serif;
    color:#1d3557;
  "
>

  <div
    style="
      max-width:600px;
      margin:20px auto;
      background:#ffffff;
      border-radius:8px;
      overflow:hidden;
      border:1px solid #eeeeee;
    "
  >

    <!-- ================= HEADER ================= -->

    <div
      style="
        padding:30px;
        text-align:center;
        border-bottom:1px solid #eeeeee;
      "
    >

      <div
        style="
          font-size:26px;
          font-weight:bold;
          color:#0b3d6e;
          letter-spacing:2px;
        "
      >
        Amitaujas
      </div>

      <div
        style="
          font-size:10px;
          color:#333333;
          margin-top:3px;
        "
      >
        where expectations meets solutions !
      </div>

    </div>


    <!-- ================= CONTENT ================= -->

    <div
      style="
        padding:40px 35px;
      "
    >

      <h1
        style="
          margin:0 0 25px;
          font-size:28px;
          color:#102a43;
        "
      >
        Thank You for Your Query
      </h1>


      <p
        style="
          font-size:16px;
          line-height:1.7;
          margin:0 0 20px;
        "
      >
        Dear ${customerName},
      </p>


      <p
        style="
          font-size:16px;
          line-height:1.7;
          margin:0 0 20px;
        "
      >
        Thank you for contacting us.
        We have received your query successfully.
      </p>


      <p
        style="
          font-size:16px;
          line-height:1.7;
          margin:0 0 25px;
        "
      >
        Our team will review your request and contact you shortly
        to assist you further.
      </p>


      <!-- ================= INFO BOX ================= -->

      <div
        style="
          background:#f5f7fa;
          border-left:4px solid #2864f0;
          padding:18px 20px;
          margin:25px 0 30px;
          font-size:15px;
          line-height:1.6;
        "
      >
        Our team will contact you using the details provided in
        your query.
      </div>


      <p
        style="
          font-size:16px;
          margin:0 0 5px;
        "
      >
        Regards,
      </p>


      <p
        style="
          font-size:16px;
          font-weight:bold;
          margin:0;
          color:#102a43;
        "
      >
        Amitaujas LLP
      </p>

    </div>


    <!-- ================= FOOTER ================= -->

    <div
      style="
        background:#202c3b;
        color:#ffffff;
        text-align:center;
        padding:25px;
        font-size:14px;
      "
    >
      Thank you for choosing Amitaujas LLP.
    </div>

  </div>

</body>
</html>
`;

  return await sendMail({
    to: contact.email,

    subject: "Thank You for Your Query",

    html,
  });
}

// =====================================
// ADMIN NOTIFICATION EMAIL
// =====================================

async function sendAdminNotificationEmail(
  contact: IContactMaster,
) {
  /*
   * Admin email is taken from SMTP_USER.
   *
   * No static ADMIN_EMAIL required.
   */

  const adminEmail = process.env.SMTP_USER;

  if (!adminEmail) {
    throw new Error("SMTP_USER is not configured");
  }

  const name = escapeHtml(contact.name);

  const company = escapeHtml(
    contact.company || "-",
  );

  const phone = escapeHtml(contact.phone);

  const email = escapeHtml(contact.email);

  const subject = escapeHtml(contact.subject);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>New Query Received</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f6f8;
    font-family:Arial, Helvetica, sans-serif;
    color:#1d3557;
  "
>

  <div
    style="
      max-width:600px;
      margin:20px auto;
      background:#ffffff;
      border-radius:8px;
      overflow:hidden;
      border:1px solid #eeeeee;
    "
  >

    <!-- ================= HEADER ================= -->

    <div
      style="
        padding:30px;
        text-align:center;
        border-bottom:1px solid #eeeeee;
      "
    >

      <div
        style="
          font-size:26px;
          font-weight:bold;
          color:#0b3d6e;
          letter-spacing:2px;
        "
      >
        Amitaujas
      </div>

      <div
        style="
          font-size:10px;
          color:#333333;
          margin-top:3px;
        "
      >
        where expectations meets solutions !
      </div>

    </div>


    <!-- ================= CONTENT ================= -->

    <div
      style="
        padding:40px 35px;
      "
    >

      <h1
        style="
          margin:0 0 10px;
          font-size:28px;
          color:#102a43;
        "
      >
        New Query Received
      </h1>


      <p
        style="
          font-size:16px;
          line-height:1.7;
          color:#52677d;
          margin:0 0 25px;
        "
      >
        A new customer query has been submitted through the website.
      </p>


      <!-- ================= CUSTOMER DETAILS ================= -->

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
          border-collapse:collapse;
          border:1px solid #d9dee5;
          font-size:15px;
        "
      >

        <!-- NAME -->

        <tr>

          <td
            style="
              width:32%;
              padding:15px 18px;
              background:#f5f7fa;
              border-bottom:1px solid #d9dee5;
              font-weight:bold;
            "
          >
            Name
          </td>

          <td
            style="
              padding:15px 18px;
              border-bottom:1px solid #d9dee5;
            "
          >
            ${name}
          </td>

        </tr>


        <!-- COMPANY -->

        <tr>

          <td
            style="
              padding:15px 18px;
              background:#f5f7fa;
              border-bottom:1px solid #d9dee5;
              font-weight:bold;
            "
          >
            Company
          </td>

          <td
            style="
              padding:15px 18px;
              border-bottom:1px solid #d9dee5;
            "
          >
            ${company}
          </td>

        </tr>


        <!-- PHONE -->

        <tr>

          <td
            style="
              padding:15px 18px;
              background:#f5f7fa;
              border-bottom:1px solid #d9dee5;
              font-weight:bold;
            "
          >
            Phone
          </td>

          <td
            style="
              padding:15px 18px;
              border-bottom:1px solid #d9dee5;
            "
          >
            ${phone}
          </td>

        </tr>


        <!-- EMAIL -->

        <tr>

          <td
            style="
              padding:15px 18px;
              background:#f5f7fa;
              border-bottom:1px solid #d9dee5;
              font-weight:bold;
            "
          >
            Email
          </td>

          <td
            style="
              padding:15px 18px;
              border-bottom:1px solid #d9dee5;
            "
          >
            ${email}
          </td>

        </tr>


        <!-- SUBJECT -->

        <tr>

          <td
            style="
              padding:15px 18px;
              background:#f5f7fa;
              font-weight:bold;
            "
          >
            Subject
          </td>

          <td
            style="
              padding:15px 18px;
            "
          >
            ${subject}
          </td>

        </tr>

      </table>

      <!-- ================= ACTION BOX ================= -->

      <div
        style="
          margin-top:25px;
          background:#edf4ff;
          border-left:4px solid #2864f0;
          padding:18px 20px;
          font-size:15px;
          line-height:1.6;
        "
      >
        Please review the query and contact the customer as soon as possible.
      </div>

    </div>


    <!-- ================= FOOTER ================= -->

    <div
      style="
        background:#202c3b;
        color:#ffffff;
        text-align:center;
        padding:25px;
        font-size:14px;
      "
    >
      Amitaujas LLP | New Website Query
    </div>

  </div>

</body>
</html>
`;

  return await sendMail({
    to: adminEmail,

    subject: `New Query Received - ${contact.subject}`,

    /*
     * When admin clicks Reply,
     * email will go directly to customer.
     */
    replyTo: contact.email,

    html,
  });
}

// =====================================
// GET CONTACT
// =====================================

export async function getContactService() {
  try {
    return await ContactMaster.find({
      isActive: true,
      isDisplay: true,
    }).sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error("Error getting Contact:", error);

    throw error;
  }
}

// =====================================
// GET CONTACT BY ID
// =====================================

export async function getContactByIdService(
  id: string,
) {
  try {
    return await ContactMaster.findOne({
      _id: id,
      isActive: true,
      isDisplay: true,
    });
  } catch (error) {
    console.error(
      `Error getting Contact with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// UPDATE CONTACT
// =====================================

export async function updateContactService(
  id: string,
  updateData: Partial<IContactMaster>,
) {
  try {
    // =====================================
    // VALIDATION
    // =====================================

    // Name
    if (!updateData.name?.trim()) {
      throw new Error("Name is required");
    }

    // Email
    if (!updateData.email?.trim()) {
      throw new Error("Email is required");
    }

    // Phone
    if (!updateData.phone?.trim()) {
      throw new Error("Phone is required");
    }

    // Subject
    if (!updateData.subject?.trim()) {
      throw new Error("Subject is required");
    }


    // =====================================
    // UPDATE CONTACT
    // =====================================

    return await ContactMaster.findOneAndUpdate(
      {
        _id: id,

        isActive: true,

        isDisplay: true,
      },

      {
        name: updateData.name.trim(),

        company:
          updateData.company?.trim() || "",

        email:
          updateData.email.trim().toLowerCase(),

        phone:
          updateData.phone.trim(),

        subject:
          updateData.subject.trim(),

        updatedBy:
          updateData.updatedBy,
      },

      {
        new: true,

        runValidators: true,
      },
    );
  } catch (error) {
    console.error(
      `Error updating Contact with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// DELETE CONTACT
// =====================================

export async function deleteContactService(
  id: string,
  deleteBy: string,
) {
  try {
    return await ContactMaster.findOneAndUpdate(
      {
        _id: id,

        isActive: true,
      },

      {
        isActive: false,

        isDisplay: false,

        deleteAt: new Date(),

        deleteBy,
      },

      {
        new: true,
      },
    );
  } catch (error) {
    console.error(
      `Error deleting Contact with id ${id}:`,
      error,
    );

    throw error;
  }
}

// =====================================
// GET ALL CONTACT FOR ADMIN
// =====================================

export async function getAllContactForAdminService() {
  try {
    return await ContactMaster.find().sort({
      createdAt: -1,
    });
  } catch (error) {
    console.error(
      "Error getting Contact for admin:",
      error,
    );

    throw error;
  }
}