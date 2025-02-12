import { client } from '@/sanity/lib/client';
import { STARTUP_QUERY_FIND_BY_ID } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import {Suspense} from 'react'
// import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export const experimental_ppr = true;

const StartupDetails = async({params}: {params : Promise<{id: string}>}) => {
  
    const id = (await params).id;

    const postData = await client.fetch(STARTUP_QUERY_FIND_BY_ID, {id});
    if(!postData) return notFound();

    // const parsedContent = md.render(postData?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(postData?._createdAt)}</p>

        <h1 className="heading">{postData?.title}</h1>
        <p className="sub-heading !max-w-5xl">{postData?.description}</p>
      </section>

      <section className="section_container">
        <img
          src={postData?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${postData?.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={postData?.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{postData?.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{postData?.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{postData?.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {postData ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: postData?.pitch }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/* {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )} */}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
  return (
    <div>
        <h1>{postData.title}</h1>
    </div>
  )
}

export default StartupDetails