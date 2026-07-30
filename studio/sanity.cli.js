import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'chxx9nq4',
    dataset: 'production',
  },
  studioHost: 'burjezamincc',

  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    appId: 'lfpwr4sfxba8ii7ltbmhd17o',
    autoUpdates: true,
  },
})
