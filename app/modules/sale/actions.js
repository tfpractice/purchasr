import { viewEdges, viewNodes, } from 'utils';

// import { CURRENT_USER, } from '../auth/queries';
// import { GET_SALE, } from './queries';
// import { SALE_INFO, } from './fragments';

const defs = { count: 0, status: 'PENDING', };
const sameID = next => ({ id, }) => next.id === id;
const replace = next => ({ node: prev, }) => sameID(next)(prev) ? ({ node: next, }) : ({ node: prev, });
const updateRes = next => oldRes => oldRes.map(replace(next));

export const createSale = mutate => userId => productId => (input = defs) =>
  mutate({ variables: { input: { ...input, productId, userId, }, }, });

export const editSale = mutate => id => input =>
  mutate({ variables: { input: { id, ...input, }, }, });

export const destroySale = mutate => id => () =>
  mutate({ variables: { input: { id, }, }, });

export const sellAndUpdate = mutate => userId => product => (input = defs) =>
    mutate({
      variables: {
        input: { ...input, productId: product.id, userId, },
        pInput: { id: product.id, stock: product.stock - input.count, },
      },
    });

export const editAndUpdate = mutate => sale => (input = defs) =>
mutate({
    variables: {
      input: { ...input, id: sale.id, },
      pInput: {
        id: sale.product.id,
        stock: sale.product.stock - (input.count - sale.count),
      },
    },
});

export const unSellAndUpdate = mutate => sale => mutate({
      variables: {
        input: { id: sale.id, },
        pInput: {
          id: sale.product.id,
          stock: sale.product.stock - (-sale.count),
        },
      },
//       updateQueries: {
//         GetCurrentUser: (prev, { mutationResult, }) => {
//           console.log('_________updateQueries_________');
//           console.log('_________updateQueries_________');
//           console.log('_________updateQueries_________');
//           const { viewer: { user: { sales: { edges, }, }, }, } = prev;
//
//           console.log('mutationResult', mutationResult);
//           console.log('next', mutationResult.data.deleteSale.changedSale.id);
//
//           console.log('prev', edges.filter(({ node: id, }) => id !== mutationResult.data.deleteSale.changedSale.id));
//           console.log('_________updateQueries_________');
//           console.log('_________updateQueries_________');
//           console.log('_________updateQueries_________');
//           console.log('_________updateQueries_________');
//
// // viewer
//           return { ...prev, };
//         },
//       },
      // optimisticResponse: {
      //      __typename: 'Mutation',
      //      submitComment: {
      //        __typename: 'Comment',
      //        postedBy: ownProps.currentUser,
      //        createdAt: +new Date,
      //        content: commentContent,
      //      },
      //    },
});
