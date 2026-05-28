import "dotenv/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "GitHub Profile Analyzer API",
      version: "1.0.0",
      description:
        "API to analyze GitHub profiles and store insights using Node.js, Express, Prisma, and MySQL.",
    },

    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
