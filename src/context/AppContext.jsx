import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

const AppContext = createContext(null)

const SEED = () => {
  const now = Date.now()
  const me = { id: 'u_me', name: 'You', handle: '@you', bio: 'Building with Vite', avatar: '', createdAt: now }
  const usman = { id: 'u_usman', name: 'Usman', handle: '@usman', bio: 'Product designer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', createdAt: now-1000 }
  const ali = { id: 'u_ali', name: 'Ali', handle: '@ali', bio: 'Traveler', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', createdAt: now-2000 }
  const hamza = { id: 'u_hamza', name: 'Hamza', handle: '@hamza', bio: 'Frontend dev', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', createdAt: now-2500 }
  const posts = [
    { id: uuid(), userId: usman.id, content: 'Sunsets never get old.', mediaUrl: '', mediaType: '', likes: [], comments: [], shares: 0, createdAt: now-4000 },
    { id: uuid(), userId: ali.id, content: 'Hello from the mountains!', mediaUrl: '', mediaType: '', likes: [], comments: [], shares: 0, createdAt: now-3000 },
    { id: uuid(), userId: hamza.id, content: 'Shipping a new UI today 🚀', mediaUrl: '', mediaType: '', likes: [], comments: [], shares: 0, createdAt: now-2000 },
  ]
  const conversations = {
    [usman.id]: [{ id: uuid(), from: usman.id, to: me.id, text: 'Hey there!', createdAt: now-5000 }],
    [ali.id]: [{ id: uuid(), from: me.id, to: ali.id, text: 'Hi Ali!', createdAt: now-4500 }],
    [hamza.id]: [{ id: uuid(), from: hamza.id, to: me.id, text: 'Want to pair on a feature?', createdAt: now-4300 }]
  }
  return { currentUser: me, users: [me, usman, ali, hamza], posts, conversations, notifications: [] }
}

const LS_KEY = 'social_vite_state_v2'

export function AppProvider({ children }){
  const [state, setState] = useState(() => {
    const raw = localStorage.getItem(LS_KEY)
    if(raw){
      try { return JSON.parse(raw) } catch {}
    }
    return SEED()
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }, [state])

  const userById = (id) => state.users.find(u => u.id === id)

  const actions = useMemo(() => ({
    createPost: ({ content, file }) => {
      let mediaUrl = '', mediaType = ''
      if(file){
        mediaType = file.type.startsWith('video') ? 'video' : 'image'
        mediaUrl = URL.createObjectURL(file)
      }
      const post = { id: uuid(), userId: state.currentUser.id, content, mediaUrl, mediaType, likes: [], comments: [], shares: 0, createdAt: Date.now() }
      setState(s => ({ ...s, posts: [post, ...s.posts] }))
    },
    toggleLike: (postId) => {
      setState(s => {
        const me = s.currentUser.id
        const posts = s.posts.map(p => {
          if(p.id !== postId) return p
          const liked = p.likes.includes(me)
          return { ...p, likes: liked ? p.likes.filter(id => id !== me) : [...p.likes, me] }
        })
        return { ...s, posts }
      })
    },
    addComment: (postId, text) => {
      if(!text.trim()) return
      setState(s => {
        const comment = { id: uuid(), userId: s.currentUser.id, text, createdAt: Date.now() }
        const posts = s.posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)
        const notifications = [{ id: uuid(), type: 'comment', postId, from: s.currentUser.id, createdAt: Date.now() }, ...s.notifications]
        return { ...s, posts, notifications }
      })
    },
    sharePost: (postId) => {
      setState(s => {
        const posts = s.posts.map(p => p.id === postId ? { ...p, shares: p.shares + 1 } : p)
        const notifications = [{ id: uuid(), type: 'share', postId, from: s.currentUser.id, createdAt: Date.now() }, ...s.notifications]
        return { ...s, posts, notifications }
      })
    },
    sendMessage: (toUserId, text) => {
      if(!text.trim()) return
      setState(s => {
        const msg = { id: uuid(), from: s.currentUser.id, to: toUserId, text, createdAt: Date.now() }
        const list = s.conversations[toUserId] || []
        const conversations = { ...s.conversations, [toUserId]: [...list, msg] }
        return { ...s, conversations }
      })
      // Simulated reply
      setTimeout(() => {
        setState(s => {
          const reply = { id: uuid(), from: toUserId, to: s.currentUser.id, text: '👍', createdAt: Date.now() }
          const list = s.conversations[toUserId] || []
          const conversations = { ...s.conversations, [toUserId]: [...list, reply] }
          return { ...s, conversations }
        })
      }, 1000 + Math.random()*1500)
    },
    updateProfile: (updates) => {
      setState(s => {
        const currentUser = { ...s.currentUser, ...updates }
        const users = s.users.map(u => u.id === currentUser.id ? currentUser : u)
        return { ...s, currentUser, users }
      })
    },
    search: (q) => {
      const query = q.trim().toLowerCase()
      if(!query) return { users: state.users, posts: state.posts }
      return {
        users: state.users.filter(u => u.name.toLowerCase().includes(query) || u.handle.toLowerCase().includes(query)),
        posts: state.posts.filter(p => p.content.toLowerCase().includes(query))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [state.currentUser, state.posts, state.users, state.notifications, state.conversations])

  return (
    <AppContext.Provider value={{ state, actions, userById }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
