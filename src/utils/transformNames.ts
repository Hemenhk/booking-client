export const transformReviewerName = (name: string) => {
    const spaceIndex = name.indexOf(" ");
    if (spaceIndex === -1) return name; // Return the name as is if no space is found
  
    // Extract the part of the name after the space and keep only the first letter
    const partAfterSpace = name.substring(spaceIndex + 1);
    const firstLetter = partAfterSpace.charAt(0);
    const dot = "."
    
    // Return the name with the first letter of the second part
    return name.substring(0, spaceIndex + 1) + firstLetter + dot;
  };