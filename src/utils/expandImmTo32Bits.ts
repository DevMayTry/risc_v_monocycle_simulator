export const expandImmTo32Bits = (imm: string): string => {
  
  let expandTo32Bits = "";
  
  for (let i = 0; i < 32-imm.length; i++) {
    expandTo32Bits += imm[0];
}

  return expandTo32Bits + imm;
  
}