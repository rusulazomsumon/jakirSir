'use client'

import Image from 'next/image'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Book } from '@/data/books'

type BookInfoModalProps = {
  isOpen: boolean
  onClose: () => void
  book: Book
}

export default function BookInfoModal({ isOpen, onClose, book }: BookInfoModalProps) {
  const imageSrc = book.image.startsWith('/') ? book.image : `/${book.image}`
  const isFree = book.badge === 'Free' || !book.price

  const handleAction = () => {
    onClose()
    if (book.link) {
      window.location.href = book.link
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="space-y-5 p-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{book.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{book.type === 'pdf' ? 'PDF Preview' : 'Digital resource'}</p>
          </div>
          <button onClick={onClose} className="text-sm text-slate-500">
            Close
          </button>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-border bg-slate-100">
          <div className="relative h-52 w-full">
            <Image src={imageSrc} alt={book.title} fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        <div className="space-y-4 rounded-[24px] border border-border bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">File size</p>
              <p className="mt-1 font-semibold text-slate-900">{book.size || 'Unknown'}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isFree ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {isFree ? 'Free' : 'Paid'}
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-600">{book.description ?? 'একটি সম্পূর্ণ প্রস্তুতি PDF বই, যা পরীক্ষার জন্য উপযোগী।'}</p>
          <div className="flex items-center justify-between gap-3 rounded-[20px] border border-border bg-slate-50 p-4">
            <div>
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{isFree ? 'Free' : book.price}</p>
            </div>
            <Button variant="primary" className="rounded-[18px]" onClick={handleAction}>
              {isFree ? 'Download' : 'Buy Now'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
