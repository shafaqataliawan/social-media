import { useApp } from '../context/AppContext'

export default function Notifications(){
  const { state, userById } = useApp()
  const items = [...state.notifications].sort((a,b)=>b.createdAt-a.createdAt)
  return (
    <div className="grid" style={{gridTemplateColumns:'1fr'}}>
      <div className="card"><strong>Notifications</strong></div>
      {items.length===0 && <div className="card small">You're all caught up.</div>}
      {items.map(n => (
        <div key={n.id} className="card">
          <div className="row">
            <div className="badge">{n.type}</div>
            <div className="small">{new Date(n.createdAt).toLocaleString()}</div>
          </div>
          <div style={{marginTop:6}}>
            From <strong>{userById(n.from)?.name}</strong>
          </div>
        </div>
      ))}
    </div>
  )
}
