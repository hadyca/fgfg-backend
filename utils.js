export function calculateAge(birthDate) {
  const today = new Date();
  const birthdate = new Date(birthDate);

  let age = today.getFullYear() - birthdate.getFullYear();

  // 생일이 지났는지 확인
  const monthDifference = today.getMonth() - birthdate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age + "";
}
