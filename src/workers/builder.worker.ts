import { compile as uniroll } from 'uniroll'

export async function compile(
  files: { [path: string]: string },
  entry: string
): Promise<string> {
  console.log('[builder.worker]', files)
  const rolled = await uniroll({
    files,
    input: entry
  })
  const out = await rolled.generate({ format: 'esm' })
  return out.output[0].code
}
