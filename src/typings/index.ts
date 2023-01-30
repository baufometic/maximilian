//____________________ STRINGS ____________________
export type TLettersLowerCase = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

//____________________ COLOURS ____________________
export type TRGBColour = `${ "rgb"|"RGB" }(${ number },${ number },${ number })`;
export type TRGBAColour = `${ "rgba" | "RGBA" }(${ number },${ number },${ number },${ number })`;
export type THexColour = `#${ string }`;
