// @flow strict

import type { CommandType, CommandAndKeyType, CommandTypeUnormalized } from "./commands.js";
//import type { ClassCommands, JoinOrDiscussType, ClassType } from "./classes.js";

import { COMMANDS } from "./commands.js";
//import { CLASSES } from "./classes.js";
import { viewHelpPage } from "./help.js";


const redirect: (string) => Promise<void> = async function (url: string) {
  await window.location.replace(url);
};

const parsecommands: (CommandAndKeyType) => {[string]: CommandTypeUnormalized} = function(inCommands: CommandAndKeyType) {
  var ret: {[string]: CommandTypeUnormalized} = {};
  for (var key of Object.keys(inCommands)) {
    var val = inCommands[key];
    var newVal: CommandTypeUnormalized = {
      name: val.name,
      url: val.url,
      searchurl: val.searchurl,
      otherNames: val.aliases,
    }
    ret[key] = newVal;
    if (val.aliases && val.aliases.length) {
      for(var altKey of val.aliases) {
        var others = val.aliases.filter((elem) => elem != altKey);

        var newVal: CommandTypeUnormalized = {
          name: val.name,
          url: val.url,
          searchurl: val.searchurl,
          otherNames: others.concat([key]),
        }
        ret[altKey] = newVal;

      }
    }
  }
  console.log(ret);
  return ret;
};

const bunnylol: (string) => Promise<boolean> = async function (
  currCmd: string
) {
  let arr: Array<string> = [];
  // split the current command on spaces and '$' if it starts with a '$'
  if (currCmd.startsWith("$")) {
    arr = currCmd.split(/[ $+]/g);
    arr[0] = "$";
    if (arr[1] === "") {
      arr = ["$"];
    }
  } else {
    arr = currCmd.split(/[ +]/g);
  }
  if (arr.length > 0) {
    // Ignore the '.' at the end of the command
    const prefix: string = arr[0].endsWith(".")
      ? arr[0].substring(0, arr[0].length - 1).toLowerCase()
      : arr[0].toLowerCase();
/*    if (prefix in CLASSES) {
      // $FlowFixMe - this is actually correct since the prefix is a key.
      const classData: ClassType = CLASSES[prefix];
      if (arr.length > 1) {
        if (arr[1].toLowerCase() === "j" && classData.zoomurl) {
          await redirect(`${classData.zoomurl}`);
          return true;
        } else if (arr[1].toLowerCase() === "d" && classData.discussionurl) {
          await redirect(`${classData.discussionurl}`);
          return true;
        } else if (arr[1].toLowerCase() === "c" && classData.collaburl) {
          await redirect(`${classData.collaburl}`);
          return true;
        } else if (arr[1].toLowerCase() === "s" && classData.specialurl) {
          await redirect(`${classData.specialurl}`);
          return true;
        }
      }
      await redirect(`${classData.url}`);
      return true;
    }
*/
    if (prefix in parsedCommands) {
      // $FlowFixMe - this is actually correct since the prefix is a key.
      const command: CommandType = parsedCommands[prefix];
      const protocol: string = new URL(command.url).protocol;
      if (protocol !== "https:" && protocol !== "http:") {
        viewHelpPage();
      }
      // Handle searchUrl being a function so that things could be composed
      if (command.searchurl && arr.length !== 1) {
        const searchParam = prefix !== "$" ? prefix.length + 1 : prefix.length;
        await redirect(
          `${command.searchurl}${encodeURIComponent(
            currCmd.substr(searchParam)
          )}`
        );
        return true;
      } else {
        await redirect(command.url);
        return true;
      }
    }
  }
  return false;
};
const parsedCommands = parsecommands(COMMANDS);

const currCmd: string =
  new URL(window.location.href).searchParams.get("search") ?? "help";

switch (currCmd) {
  case "help" || "":
    viewHelpPage();
    break;
  default:
    bunnylol(currCmd)
      .then((done: boolean) => {
        if (!done && parsedCommands.DEFAULT.searchurl) {
          redirect(
            `${parsedCommands.DEFAULT.searchurl}${encodeURIComponent(currCmd)}`
          );
        }
      })
      .catch((reject: string) => {
        console.log(reject);
      });
    break;
}
