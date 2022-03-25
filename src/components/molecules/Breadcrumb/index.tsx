import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import * as S from './styles'
import { useAuthService } from 'services/auth-services/auth-service'

export type BreadCrumbLinks = {
  label: string
  url: string
}[]

export default function Breadcrumb() {
  const { asPath } = useRouter()
  const authCtx = useAuthService()
  const [breadCrumbLinks, setBreadCrumbLinks] = useState<BreadCrumbLinks>([])

  useEffect(() => {
    if (asPath) {
      const routePaths = asPath.split('/')
      routePaths.shift()

      if (!routePaths[0]) {
        routePaths.shift()
      }

      const breadCrumbLinksObject: BreadCrumbLinks = routePaths.map(
        (path, i) => {
          return {
            label: path,
            url: '/' + routePaths.slice(0, i + 1).join('/')
          }
        }
      )

      setBreadCrumbLinks(breadCrumbLinksObject)
    }
  }, [asPath])

  const renderBreadCrumbLlinks = () => {
    if (breadCrumbLinks.length > 0) {
      return breadCrumbLinks.slice(1).map((link) => {
        const breadCrumbLinkAtivo =
          breadCrumbLinks[breadCrumbLinks.length - 1].label === link.label

        return (
          <li key={link.label}>
            <a href={link.url}>{link.label.replace('-', ' ')}</a>
            <span
              className={breadCrumbLinkAtivo ? 'divider-off' : 'divider-on'}
            />
          </li>
        )
      })
    }
  }

  if (!breadCrumbLinks.length) {
    return <></>
  }

  return (
    <>
      {authCtx.isLoggedIn && (
        <S.Wrapper>
          <div className="content">
            {breadCrumbLinks.length > 0 ? (
              <h2 className="title">
                <a href={breadCrumbLinks[0].url}>{breadCrumbLinks[0].label}</a>
              </h2>
            ) : null}

            <div className="breadcrumb-links">
              <ul>{renderBreadCrumbLlinks()}</ul>
            </div>
          </div>
        </S.Wrapper>
      )}
    </>
  )
}
