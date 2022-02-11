require("dotenv").config();

import { Handler, HandlerResponse } from "@netlify/functions";
import sgMail from "@sendgrid/mail";
import {
  ArtworkType,
  MountType,
  GlassType,
  WoodFinishType,
  WoodMaterialType,
} from "../../types/form";

const apiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;
const adminRecipient = process.env.ADMIN_RECIPIENT;

sgMail.setApiKey(apiKey);
interface FormFields {
  name: string;
  email: string;
  optIn: boolean;
  artworkType: string;
  artworkHeight: number;
  artworkWidth: number;
  mountType: string;
  glassType: string;
  woodFinishType: string;
  woodMaterialType: string;
}

const handler: Handler = async (event) => {
  const formValues: FormFields = JSON.parse(event.body);
  const {
    name,
    email,
    artworkType,
    artworkHeight,
    artworkWidth,
    mountType,
    glassType,
    woodFinishType,
    woodMaterialType,
  } = formValues;

  let statusCode: number;
  let responseBody: { msg: string };

  const msg = {
    to: adminRecipient, // Change to your recipient
    from: senderEmail, // Change to your verified sender
    subject: `${name} has requested a quote 🙋`,
    text: `
    name: ${name}
    email: ${email}
    artwork type: ${ArtworkType[artworkType]}
    artwork height: ${artworkHeight}cm
    artwork width: ${artworkWidth}cm
    mount: ${MountType[mountType]}
    glass: ${GlassType[glassType]}
    wood finish: ${WoodFinishType[woodFinishType]}
    material: ${WoodMaterialType[woodMaterialType]}
    `,
    html: `
    <div>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Artwork type:</strong> ${ArtworkType[artworkType]}</p>
    <p><strong>Artwork height:</strong> ${artworkHeight}cm</p>
    <p><strong>Artwork width:</strong> ${artworkWidth}cm</p>
    <p><strong>Mount:</strong> ${MountType[mountType]}</p>
    <p><strong>Glass:</strong> ${GlassType[glassType]}</p>
    <p><strong>Wood finish:</strong> ${WoodFinishType[woodFinishType]}</p>
    <p><strong>Material:</strong> ${WoodMaterialType[woodMaterialType]}</p>
    </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
    responseBody = { msg: "ok" };
    statusCode = 200;
  } catch (err) {
    statusCode = 500;
    responseBody = {
      msg: err.msg || err.message || "an unknown error occurred",
    };
    console.log(err);
    console.log(err.response.body.errors);
  }

  const response: HandlerResponse = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": process.env.URL ?? "http://localhost:8888",
    },
    body: JSON.stringify(responseBody),
  };
  return response;
};

// const handler: Handler = async () => {
//   const response: HandlerResponse = {
//     statusCode: 500,
//     headers: {
//       "Access-Control-Allow-Origin": allowedOrigin,
//     },
//     body: JSON.stringify({}),
//   };
//   return response;
// };

export { handler };
