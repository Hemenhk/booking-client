import { termsData } from '@/utils/terms'

export default function TermsPolicyPage() {
  return (
    <div>
      <h1 className='text-3xl text-neutral-800 font-bold pb-10'>Användarvillkor för Bookely.</h1>
      {termsData.map((term, index) => (
        <div key={index} className="flex flex-col gap-4 py-5">
          <h2 className='text-xl text-neutral-800 font-semibold border-b pb-4'>{index + 1}.{" "}{term.title}</h2>
          <div className='text-neutral-700' dangerouslySetInnerHTML={{ __html: term.content }} />
        </div>
      ))}
    </div>
  )
}
