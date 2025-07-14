// const c = require("ansi-colors")

// Simple color functions without external dependency
const colors = {
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
  dim: (text) => `\x1b[2m${text}\x1b[0m`
}

// Create helper object mimicking the subset of `ansi-colors` that we need
const c = {
  // Regular yellow text function
  yellow: Object.assign(
    (text) => colors.yellow(text),
    {
      // Yellow & bold
      bold: (text) => colors.bold(colors.yellow(text)),
      // Yellow & dimmed
      dim: (text) => colors.dim(colors.yellow(text)),
    }
  ),
  // Stand-alone bold and dim helpers
  bold: colors.bold,
  dim: colors.dim,
}

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    // TODO: we need a good doc to point this to
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
]

function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter(function (env) {
    return !process.env[env.key]
  })

  if (missingEnvs.length > 0) {
    console.warn(
      c.yellow.bold("\n⚠️  Warning: Missing environment variables\n")
    )

    missingEnvs.forEach(function (env) {
      console.warn(c.yellow(`  ${c.bold(env.key)}`))
      if (env.description) {
        console.warn(c.dim(`    ${env.description}\n`))
      }
    })

    console.warn(
      c.yellow(
        "\nApplication will continue but some features may not work properly.\n"
      )
    )

    // Changed from process.exit(1) to just warning
    return false
  }
  
  return true
}

module.exports = checkEnvVariables
