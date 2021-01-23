import React from 'react';
import { GetServerSideProps } from 'next';

import { getSiteSettings } from '../lib/sanityQueries';
import { SiteSettings } from '../../studio/models';
import SiteLayout from '../components/SiteLayout';

type Props = {
  settings: SiteSettings;
}

const Playlist = (props: Props): JSX.Element => {
  const { settings } = props;
  const { playlistUrl } = settings;

  return (
    <SiteLayout settings={settings}>
      <div className="aspect-ratio ar-16-9 bg-black cursor-pointer">
        <iframe
          src={playlistUrl}
          className="absolute top-0 left-0 w-full h-full z-20"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </SiteLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const settings = await getSiteSettings();

  return {
    props: {
      settings,
    },
  };
};

export default Playlist;
