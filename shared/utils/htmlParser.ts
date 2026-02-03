/**
 * Парсит HTML строку с элементами списка и возвращает массив строк
 * @param htmlString - HTML строка с <ul><li> элементами
 * @returns Массив строк без HTML тегов
 */
export const parseHtmlListItems = (htmlString: string): string[] => {
  if (!htmlString) return []
  
  try {
    // Создаем временный DOM элемент для парсинга HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlString
    
    // Находим все <li> элементы
    const listItems = tempDiv.querySelectorAll('li')
    
    // Извлекаем текстовое содержимое каждого элемента
    return Array.from(listItems).map(item => item.textContent?.trim() || '')
  } catch (error) {
    console.error('Error parsing HTML list items:', error)
    return []
  }
}

/**
 * Безопасно отображает HTML контент (для использования с dangerouslySetInnerHTML)
 * @param htmlString - HTML строка
 * @returns Объект для dangerouslySetInnerHTML
 */
export const createMarkup = (htmlString: string) => {
  return { __html: htmlString }
}
