import { compile as uniroll } from 'uniroll-vue'

export async function compile(
  files: { [path: string]: string },
  imports: { [module: string]: string },
  entry: string
): Promise<string> {
  console.log('[builder.worker]', files, imports)
  const rolled = await uniroll({
    files,
    input: entry,
    importmaps: {
      imports
    },
    onwarn(warnings) {
      console.warn('[uniroll-warn]', warnings)
    }
  })
  const out = await rolled.generate({
    format: 'es'
  })
  // console.log('[builder.worker] output', out.output[0].code)
  return out.output[0].code
}
