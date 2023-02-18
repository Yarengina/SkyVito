export const titleCase = (text) => {
  if (!text) return text
  return text[0].toUpperCase() + text.slice(1)
}

export const convertDate = (dateString) => {
  const currentDate = new Date()
  const offsetMin = currentDate.getTimezoneOffset()
  const date = new Date(Date.parse(dateString) - offsetMin * 60 * 1000)

  return date.toLocaleString().slice(0, -3).split(', ').join(' в ')
}

const months = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря',
}

export const formatSellsFrom = (date) => {
  const date_split = date.split('-')
  const year = date_split[0]

  if (date_split.length < 2) return year
  const month = date_split[1]
  const msg = months[month] + ' ' + year
  return msg
}

export const formatDateForComments = (date) => {
  const date_split = date.split('-')
  const day = date_split[2].split('T')[0]

  const month = date_split[1]
  const msg = day + ' ' + months[month]
  return msg
}

export const getEndingOfWord = (amount) => {
  let ending
  const rest = amount % 10
  const rest100 = amount % 100

  if (rest === 0 || (rest >= 5 && rest <= 19)) {
    ending = 'ов'
  }
  if (rest === 1) {
    ending = ''
  }
  if (rest >= 2 && rest <= 4) {
    ending = 'а'
  }
  if (rest100 >= 11 && rest100 <= 19) {
    ending = 'ов'
  }
  return ending
}

export const getErrorMessage = (error) => {
  if (!('data' in error)) return 'Что-то пошло не так...'

  const errData = error.data
  const errorFromApi = errData.detail || errData.details || ''

  if (errorFromApi.includes('UNIQUE constraint failed'))
    return 'Этот e-mail занят'

  if (errorFromApi.includes('Incorrect email')) return 'Неверный email'

  if (errorFromApi.includes('Incorrect password')) return 'Неверный пароль'
  return errorFromApi
}

export const parseJWT = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = decodeURIComponent(
    window
      .atob(base64Url)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(base64)
}

export const getUserEmailFromJWT = (token) => {
  return parseJWT(token).email
}

export const formatPhone = (phone) => {
  if (typeof phone !== 'string') {
    return ''
  }

  const phoneLength = phone.length

  if (phone.startsWith('+') && phoneLength >= 5) {
    return phone.slice(0, 2) + ' ' + phone.slice(2, 5) + ' ' + phone.slice(5)
  }

  if (phoneLength >= 4) {
    return phone.slice(0, 1) + ' ' + phone.slice(1, 4) + ' ' + phone.slice(4)
  }

  return Array(phone?.length).fill('X').join('')
}

export const formatHiddenPhone = (phone) => {
  if (typeof phone !== 'string') {
    return ''
  }

  const phoneLength = phone.length

  if (phone.startsWith('+') && phoneLength >= 5) {
    return (
      phone.slice(0, 2) +
      ' ' +
      phone.slice(2, 5) +
      ' ' +
      Array(phone.length - 5)
        .fill('X')
        .join('')
    )
  }

  if (phoneLength >= 4) {
    return (
      phone.slice(0, 1) +
      ' ' +
      phone.slice(1, 4) +
      ' ' +
      Array(phone.length - 4)
        .fill('X')
        .join('')
    )
  }

  return Array(phone?.length).fill('X').join('')
}
