import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Messages(){
  const { state, actions } = useApp()
  const others = state.users.filter(u=>u.id!==state.currentUser.id)
  const [active, setActive] = useState(others[0]?.id || null)
  const conv = useMemo(()=> active ? (state.conversations[active]||[]) : [], [state.conversations, active])
  const [text, setText] = useState('')

  return (
    <div className="grid messages-layout">
      <aside className="card messages-sidebar">
        <strong>Chats</strong>
        {others.map(u => (
          <button key={u.id} className={`btn ${active===u.id?'primary':''}`} style={{width:'100%', marginTop:8}} onClick={()=>setActive(u.id)}>
            <img className="avatar" src={u.avatar || `https://api.dicebear.com/8.x/identicon/svg?seed=${u.name}`}/>
            {u.name}
          </button>
        ))}
      </aside>
      <section className="card messages-pane">
        <div className="small">Chatting as {state.currentUser.name}</div>
        <div className="messages-scroll">
          {conv.map(m => (
            <div key={m.id} style={{display:'flex', justifyContent: m.from===state.currentUser.id?'flex-end':'flex-start'}}>
              <div className="card" style={{background: m.from===state.currentUser.id? 'var(--primary)' : '#0e1522'}}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e)=>{e.preventDefault(); if(active){ actions.sendMessage(active, text); setText('') }}} className="row">
          <input className="input" placeholder="Type a message" value={text} onChange={e=>setText(e.target.value)} />
          <button className="btn primary" type="submit">Send</button>
        </form>
      </section>
    </div>
  )
}
