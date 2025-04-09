import { jobQueue } from "../app";
import Docker from "dockerode";
import ApiError from "../utils/ApiError";

export const handleCodeExecution = () => {
  jobQueue.process(async (job) => {
    console.log("\n--- Starting to process job ---");
    const { code, language } = job.data;
    console.log("Processing Job ID:", job.id);
    let image;
    let command;
    const docker = new Docker();

    switch (language.toLowerCase()) {
      case "javascript":
        image = "node:18-alpine"; // lightweight Node.js
        command = ["node", "-e", code];
        break;

      case "java":
        image = "openjdk:17-alpine"; // smaller than openjdk:latest
        command = [
          "sh",
          "-c",
          `echo '${code}' > Main.java && javac Main.java && java Main`,
        ];
        break;

      case "cpp":
        image = "gcc:latest"; // there's no official alpine gcc, so use latest
        command = [
          "sh",
          "-c",
          `echo '${code}' > main.cpp && g++ main.cpp -o main && ./main`,
        ];
        break;

      case "python":
        image = "python:3.11-alpine"; // small and fast to pull
        command = [
          "sh",
          "-c",
          `echo '${code}' > script.py && python script.py`,
        ];
        break;

      case "c":
        image = "gcc:latest"; // same as C++
        command = [
          "sh",
          "-c",
          `echo '${code}' > main.c && gcc main.c -o main && ./main`,
        ];
        break;

      default:
        throw new ApiError(400, "Unsupported language");
    }

    const containerConfig = {
      Image: image,
      Tty: false,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: command,
    };
    try {
      const startTime = new Date();
      const container = await docker.createContainer(containerConfig);
      await container.start();

      const logs = await container.logs({
        stdout: true,
        stderr: true,
        follow: true,
      });
      logs.on("data", (chunk) => {
        console.log(chunk.toString());
      });
    } catch (error) {
      console.log("Error from Here : ", error);
      throw new ApiError(501, "Docker Container Error : " + error);
    }
    console.log("Finished processing job:", job.id);
    return { result: "success" };
  });
};
