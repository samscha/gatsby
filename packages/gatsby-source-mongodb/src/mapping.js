const camelCase = require(`lodash.camelcase`)
const isString = require(`lodash.isstring`)
const crypto = require(`crypto`)

module.exports = function(node, key, text, mediaType, createNode) {
  const str = isString(text) ? text : ` `
  const id = `${node.id}${key}MappingNode`
  const mappingNode = {
    id: id,
    parent: node.id,
    [key]: str,
    children: [],
    internal: {
      type: camelCase(`${node.internal.type} ${key} MappingNode`),
      mediaType: mediaType,
      content: str,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(str))
        .digest(`hex`),
    },
  }

  node.children = node.children.concat([mappingNode.id])

  return mappingNode
}
