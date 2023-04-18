import React, {useEffect, useState} from 'react';
import { fetchDocuments } from './firebase/firebase.utils'
import { sanitize } from 'dompurify';
import memoizeOne from 'memoize-one'
import { Spinner } from './components/ui/loading/loading.component';

const storage = {
  get(key) {
    try {
      const item = sessionStorage.getItem(key);
      return JSON.parse(item)
    } catch {
      return
    }
  },
  set(key,value) {
    try {
      sessionStorage.setItem(key,JSON.stringify(value));
    } catch {
      return
    }
  }
}

const toCamelCase = (word) => word.split(' ').map((txt,ind) => ind !== 0 ? txt.charAt(0).toUpperCase() + txt.slice(1) : txt).join('')
const size = (obj={}) => Object.keys(obj).length

const formatElements = (elements) => {
  Object.keys(elements).forEach(key => {
    const camelKey = toCamelCase(key)
    if (camelKey !== key) {
      elements[camelKey] = elements[key]
      delete elements[key]
    }
    elements[camelKey] = elements[camelKey].value
    if (typeof elements[camelKey] === 'string') {
      elements[camelKey] = sanitize(elements[camelKey])
    }
  })
  return elements
}

export const api = {
  branding: memoizeOne(async () => {
    const elements = await fetchDocuments('branding')
    const formatted = formatElements(elements)
    return formatted
  }),
  contact: memoizeOne(async () => {
    const elements = await fetchDocuments('contact')
    const formatted = formatElements(elements)
    return formatted
  })
}

export const withCms = (Component) => {
  return (props) => {
    const [_cms, _setCms] = useState({})
    const state = {
      get cms() { 
        return size(_cms) ? _cms : storage.get('cms') || {}
      },
      set cms(val) {
        storage.set('cms',val)
        _setCms(val)
      }
    }
    useEffect(() => {
      async function fetchData() {
        const _branding = await api.branding()
        const _contact = await api.contact()
        state.cms = { branding: _branding, contact: _contact}
      }
      !size(state.cms) && fetchData()
    },[])
    return (
      size(state.cms) ?
      <Component {...props} cms={state.cms} />
      :
      <Spinner />
    )
  }
}