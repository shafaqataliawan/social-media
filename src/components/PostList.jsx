import PostItem from './PostItem'

export default function PostList({ posts }){
  if(!posts.length) return <div className="card small">No posts yet.</div>
  return (
    <div className="grid" style={{gridTemplateColumns:'1fr'}}>
      {posts.map(p => <PostItem key={p.id} post={p} />)}
    </div>
  )
}
