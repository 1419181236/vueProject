import axios from 'axios'
import book from '@/store/getters'

export function saveBookShelfSQL() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/BookShelf/`,
    params: {
      fileName: book.fileName
    }
  })
}
