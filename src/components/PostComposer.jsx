import { useRef, useState } from 'react'
import { useApp } from '../context/AppContext'

export default function PostComposer(){
  const { state, actions } = useApp()
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const fileRef = useRef()

  const submit = (e) => {
    e.preventDefault()
    if(!text.trim() && !file) return
    actions.createPost({ content: text, file })
    setText('')
    setFile(null)
    if(fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="card">
      <div className="post">
        <img className="avatar" src={state.currentUser.avatar || 'https://api.dicebear.com/8.x/identicon/svg?seed=you'} alt="avatar"/>
        <div className="post-body">
          <form onSubmit={submit}>
            <textarea className="input" placeholder="What's happening?" value={text} onChange={e=>setText(e.target.value)} />
            <div className="space-between" style={{marginTop:8}}>
              <div className="toolbar">
                <input ref={fileRef} type="file" accept="image/*,video/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
              </div>
              <button className="btn primary" type="submit">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
