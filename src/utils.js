import React from 'react';
const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export function numWord(value) {
  let num = value % 10;
  if((value > 1 && value < 5) || (value > 21 && (num > 1 && num < 5))) return 'раза'; 
  return 'раз';
}

export function selectMessage(num) {
  if (num === 0) {
    return '';
  } else {
    return <span>| Выделяли {num} {numWord(num)}</span>;
  }
}