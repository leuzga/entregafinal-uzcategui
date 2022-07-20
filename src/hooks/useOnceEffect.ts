import { EffectCallback, useEffect } from 'react'

function useEffectOnce(effect: EffectCallback | any) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}

export default useEffectOnce
