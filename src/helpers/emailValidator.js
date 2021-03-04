export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length <= 0) return "O campo de email é obrigatório."
  if (!re.test(email)) return 'Opa ! precisa ser um email válido'
  return ''
}
