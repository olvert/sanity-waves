import React from 'react';
import { GetStaticProps } from 'next';

import { getSiteSettings } from '../lib/sanityQueries';
import { SiteSettings } from '../lib/models';
import SiteLayout from '../components/SiteLayout';

type Props = {
  settings: SiteSettings;
}

const Playlist = (props: Props): JSX.Element => {
  const { settings } = props;
  const { playlistUrl } = settings;

  return (
    <SiteLayout settings={settings}>
      <div className="aspect-w-16 aspect-h-9 bg-black cursor-pointer">
        <iframe
          src={playlistUrl}
          className="absolute top-0 left-0 w-full h-full z-10"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </SiteLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const settings = await getSiteSettings();

  return {
    props: {
      settings,
    },
    revalidate: 1,
  };
};

export default Playlist;
