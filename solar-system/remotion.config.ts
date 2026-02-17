// remotion.config.ts
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setAudioCodec("aac");
Config.setMuted(false);
Config.setConcurrency(4);