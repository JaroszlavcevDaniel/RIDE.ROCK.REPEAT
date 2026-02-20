import {setGlobalOptions} from "firebase-functions/v2";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import {send} from "@emailjs/nodejs";

admin.initializeApp();
setGlobalOptions({maxInstances: 10});

export const onCommentCreated = onDocumentCreated(
  "articles/{articleId}/comments/{commentId}",
  async (event) => {
    const snap = event.data;

    if (!snap) {
      logger.error("No snapshot data");
      return;
    }

    const comment = snap.data();
    const articleId = event.params.articleId;

    logger.info("Új komment érkezett", {
      articleId,
      user: comment.userName,
    });

    const message = `
Új komment érkezett!

Cikk ID: ${articleId}
Felhasználó: ${comment.userName}
Szöveg:
${comment.text}
`;

    try {
      await send(
        "service_nhs9ip5", // EmailJS service
        "template_9b7dp1h", // EmailJS template
        {
          message,
          user_name: comment.userName,
          comment_text: comment.text,
          article_id: articleId,
        },
        {
          publicKey: "kjQe7FQOJlPovmcD4",
          privateKey: "FCTf0AuzkixP4IikNT149",
        }
      );

      logger.info("Email sikeresen elküldve");
    } catch (error) {
      logger.error("Email küldési hiba:", error);
    }
  }
);

