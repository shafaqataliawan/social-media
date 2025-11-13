import { useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import PostList from '../components/PostList'

export default function Profile(){
  const { state, actions } = useApp()
  const me = state.currentUser
  const myPosts = state.posts.filter(p=>p.userId===me.id).sort((a,b)=>b.createdAt-a.createdAt)
  const [name, setName] = useState(me.name)
  const [bio, setBio] = useState(me.bio || '')
  const fileRef = useRef()

  const onAvatar = (file) => {
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => actions.updateProfile({ avatar: reader.result })
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid">
      <div>
        <div className="card">
          <div className="row">
            <img className="avatar" src={me.avatar || 'https://api.dicebear.com/8.x/identicon/svg?seed=you'} alt="avatar"/>
            <div style={{flex:1}}>
              <input className="input" value={name} onChange={e=>setName(e.target.value)} />
              <textarea className="input" style={{marginTop:8}} value={bio} onChange={e=>setBio(e.target.value)} />
              <div className="toolbar" style={{marginTop:8}}>
                <input ref={fileRef} type="file" accept="image/*" onChange={e=>onAvatar(e.target.files?.[0])} />
                <button className="btn primary" onClick={()=>actions.updateProfile({ name, bio })}>Save</button>
              </div>
            </div>
          </div>
        </div>
        <PostList posts={myPosts} />
      </div>
      <aside>
        <div className="card">
          <strong>About</strong>
          <div className="small" style={{marginTop:6}}>Handle: {me.handle}</div>
          <div className="small">Member since: {new Date(me.createdAt).toLocaleDateString()}</div>
        </div>
      </aside>
    </div>
  )
}
