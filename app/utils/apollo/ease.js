import { spread, } from 'fenugreek-collections';

const identity = x => x;
const invokeOn = x => (f = identity) => f(x);
const binVoke = (arg, f) => invokeOn(arg)(f);

export const getData = ({ data, }) => data;
export const getViewer = ({ viewer, }) => viewer;
export const getColl = ({ collection, }) => collection;
export const getEdges = ({ edges, }) => spread(edges);
export const getNode = ({ node, }) => node;

export const viewEdges = (qRes) => {
  console.log('viewEdges,qRes', qRes);
  return [ getViewer, getColl, getEdges, ].reduce(binVoke, qRes);
};

export const viewNodes = (qRes) => {
  console.log('viewNodes,qRes', qRes);
  return viewEdges(qRes).map(getNode);
};
export const getID = ({ id, }) => id;
