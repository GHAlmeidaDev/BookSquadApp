export function passwordValidator(password) {
  if (!password || password.length <= 0) return "O campo de senha é obrigatório."
  if (!password || password.length <= 8) return "Sua senha precisa conter pelo menos 9 caracteres"
  return ''
}
