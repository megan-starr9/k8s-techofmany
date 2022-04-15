import Head from 'next/head'
import { findLibrary } from '@techofmany/media/service/library';
import type { Library } from '@techofmany/storage/types/Library';

type MediaPageProps = {
  library: Library,
};

export async function getServerSideProps(context) {
  const param = context.params.slug.join('/');
  const library = await findLibrary(param);
  return { props: { library } }
}

export default function MediaPage({
  library,
}: MediaPageProps) {
  return (
    <div>
      <Head>
        <title>{library.name}</title>
      </Head>

      <h1>{library.name}</h1>
    </div>
  )
}
