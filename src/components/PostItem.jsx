import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function PostItem({ post }){
  const { actions, userById, state } = useApp()
  const user = userById(post.userId)
  const liked = post.likes.includes(state.currentUser.id)
  const [comment, setComment] = useState('')

  return (
    <div className="card">
      <div className="post">
        <img className="avatar" src={user?.avatar || `https://api.dicebear.com/8.x/identicon/svg?seed=${user?.name||'user'}` } alt="avatar"/>
        <div className="post-body">
          <div className="space-between">
            <strong>{user?.name} <span className="small">{user?.handle}</span></strong>
            <span className="small">{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <div style={{marginTop:6, whiteSpace:'pre-wrap'}}>{post.content}</div>
          {post.mediaUrl && (
            post.mediaType === 'video' ? (
              <video src={post.mediaUrl} controls style={{marginTop:8}} />
            ) : (
              <img src={post.mediaUrl} alt="media" style={{marginTop:8}} />
            )
          )}
          <div className="post-actions">
            <button className={`btn ${liked? 'primary':''}`} onClick={()=>actions.toggleLike(post.id)}>❤ <span className="count">{post.likes.length}</span></button>
            <button className="btn ghost" onClick={()=>actions.sharePost(post.id)}>↗ <span className="count">{post.shares}</span></button>
          </div>

          <div style={{marginTop:8}}>
            {post.comments.map(c => (
              <div className="comment" key={c.id}>
                <strong>{userById(c.userId)?.name}</strong>
                <div className="small">{new Date(c.createdAt).toLocaleString()}</div>
                <div style={{marginTop:4}}>{c.text}</div>
              </div>
            ))}
            <form onSubmit={(e)=>{e.preventDefault(); actions.addComment(post.id, comment); setComment('')}} style={{marginTop:8}}>
              <input className="input" value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write a comment..." />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
