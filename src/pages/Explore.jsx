import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import SearchBar from '../components/SearchBar'
import PostList from '../components/PostList'

export default function Explore(){
  const { state, actions } = useApp()
  const [q, setQ] = useState('')
  const { users, posts } = useMemo(()=>actions.search(q), [q, actions])
  return (
    <div className="grid">
      <div>
        <div className="card" style={{position:'sticky', top:72, zIndex:0}}>
          <SearchBar value={q} onChange={setQ} placeholder="Search users or posts..." />
        </div>
        <PostList posts={[...posts].sort((a,b)=>b.createdAt-a.createdAt)} />
      </div>
      <aside>
        <div className="card">
          <strong>Users</strong>
          {users.map(u => (
            <div key={u.id} className="row" style={{marginTop:10}}>
              <img className="avatar" src={u.avatar || `https://api.dicebear.com/8.x/identicon/svg?seed=${u.name}`}/>
              <div>
                <div><strong>{u.name}</strong></div>
                <div className="small">{u.handle}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
