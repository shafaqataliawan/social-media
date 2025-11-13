import { useApp } from '../context/AppContext'
import PostComposer from '../components/PostComposer'
import PostList from '../components/PostList'

export default function Home(){
  const { state } = useApp()
  const sorted = [...state.posts].sort((a,b)=>b.createdAt - a.createdAt)
  return (
    <div className="grid">
      <div>
        <PostComposer />
        <PostList posts={sorted} />
      </div>
      <aside>
        <div className="card">
          <strong>Who to follow</strong>
          {state.users.filter(u=>u.id!==state.currentUser.id).map(u=> (
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
