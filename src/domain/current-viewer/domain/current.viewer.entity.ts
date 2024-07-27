type CurrentViewer = {
    id: UniqueId,
    phoneNumber: string,
    viewerAccount: ViewerAccount | undefined,
    readonly createdAt: Date
    readonly isActive: boolean
}

type ViewerAccount = {
    readonly id: UniqueId,
    readonly firstName: string
    readonly lastName: string
    readonly avatar: string
    readonly displayName: string
    readonly chats: []
    readonly blockedUsers: []
}

type UserAccountDTO = {
    firstName: string
    lastName: string
    avatar: string
    phoneNumber: string
    chats: []
    blockedUsers: []
}

// Процес создания текущего пользователя

// Авторизация пользователя:
// fail пользователь не авторизован
// Двухфакторная аутентификация пользователя
// Ввод номера телефона
// Верификация с помощью кода
// Варицикая прошла успешно
// Создаём текущего пользователя domain
// Если пользовать новый, создаём аккаунт
// если пользователь уже зарегестрирован в системе, запрашиваем данные аккаунта
// если данные не найдены, то перенаправляем для создания аккаунта
// если данные найдены, то получаем данные и разрешаем вход


export function createCurrentViewer(viewerCredentials: UserAccountDTO): CurrentViewer {

    // Процесс "Создать текущего пользователя":
    // 1. Вызван событием "Аутентификация прошла успешно"
    // 2. Главные входные данные - текущий пользователь(учётные данные)
    // 3. Неявные входные данные -
    // 4. Выходные данные - Текущий пользователь создан(domain)
    // 5. Побочных эффектов - нет

    return {

    }
}

// создал текущего пользователя
// добавил новый чат
// удалил чат
// добавил нового пользователя в список заблокированных
// удалил пользователя их списка заблокированных пользователей
// изменил номер телефона
// изменил имя
// изменил фамилию
// изменил аватар


// workflow "CREATE VIEWER" =
//   input: DATA FROM DB
//   output:
//     CreateViewer event
//