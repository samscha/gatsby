const Promise = require(`bluebird`)
const { fetchNodesFromSearch } = require(`./fetch`)

exports.sourceNodes = ({ actions, createNodeId }, pluginOptions) => {
  const { createNode } = actions
  return Promise.map(pluginOptions.queries, ({ query, limit }) =>
    fetchNodesFromSearch({ query, limit }).then(results =>
      results.forEach(result => {
        result.wikipediaId = result.id
        result.id = createNodeId(result.id)
        const node = {
          ...result,
          query,
          parent: null,
          children: [],
          internal: {
            type: `WikipediaArticle`,
          },
        }
        node.internal.contentDigest = require(`../../gatsby/src/utils/create-content-digest`)(
          node
        )
        createNode(node)
      })
    )
  )
}
