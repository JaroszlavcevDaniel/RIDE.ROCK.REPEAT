/**
 * Firebase Functions entry point
 */

import {setGlobalOptions} from "firebase-functions/v2";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import nodemailer from "nodemailer";

// limit container count (maradhat)
setGlobalOptions({maxInstances: 10});

// Firebase admin init
admin.initializeApp();

/**
 * Gmail SMTP (App Password kell!)
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zelikdaniel33@gmail.com",
    pass: "tend ysia rrno vsnt",
  },
});

/**
 * 🔥 Új komment → email értesítés
 */
export const sendEmailOnNewComment = onDocumentCreated(
  "articles/{articleId}/comments/{commentId}",
  async (event) => {
    try {
      const snap = event.data;

      if (!snap) {
        logger.error("No snapshot data");
        return;
      }

      const comment = snap.data();
      const articleId = event.params.articleId;

      logger.log("New comment:", comment);

      await transporter.sendMail({
        from: "Ride.Rock.Repeat <zelikdaniel33@gmail.com>",
        to: "TEEMAILCIMED@gmail.com",
        subject: "Új komment érkezett",
        html: `
          <h2>Új komment érkezett</h2>

          <p><strong>Cikk:</strong> ${articleId}</p>
          <p><strong>Felhasználó:</strong> ${
  comment.userName || "Anonymous"
}</p>

          <p><strong>Üzenet:</strong></p>
          <blockquote>${comment.text}</blockquote>
        `,
      });

      logger.log("Email sent successfully");
    } catch (err) {
      logger.error("Email sending failed", err);
    }
  }
);
