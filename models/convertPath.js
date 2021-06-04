/**
 * Convert "C:\User\Pictures" into "C://User//Pictures"
 */

let spinalCase = (str) => {
    let lowercase = str.trim()
    let regEx = /\W+|(?=[A-Z])|_/g
    let result = lowercase.split(regEx).join("//");
    let output = result.substring(0, 1) + ":" + result.substring(1);
  
    return output;
}

module.exports.spinalCase = spinalCase;