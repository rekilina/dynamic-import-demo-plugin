import { ChartMetadata, ChartPlugin, t } from '@superset-ui/core';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import buildQuery from './buildQuery';
import thumbnail from './images/thumbnail.png';
import Chart from './Vis';

const metadata = new ChartMetadata({
  description:
    'A chart plugin for Superset demonstrating current best practices',
  name: t('Hello World'),
  thumbnail,
  useLegacyApi: false,
});

export default class HelloWorldChartPlugin extends ChartPlugin {
  constructor() {
    super({
      buildQuery,
      Chart,
      metadata,
      transformProps,
      controlPanel,
    });
  }
}
