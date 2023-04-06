import Head from 'next/head'
import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Filter, Table } from '@/components/Table'
import { ResourceRetailInfo, ResourceOffer, ResourceData } from '@/types/resource'
import { calculateRetailDemand, calculateSaturation } from '@/utils/math'
import { QUALITY_LEVELS, RETAIL_MODELING } from '@/data/resource'

const columnHelper = createColumnHelper<ResourceData>()

const columns = [
  columnHelper.accessor((row) => row.dbLetter, {
    id: 'ID',
    header: () => 'ID',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor((row) => row.quality, {
    id: 'Quality',
    header: () => 'Quality',
    cell: (info) => info.getValue(),
    filterFn: 'equalsString',
    meta: {
      Filter
    }
  }),
  columnHelper.accessor((row) => row.price, {
    id: 'Cost Per Unit',
    header: () => 'Cost Per Unit',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor((row) => row.averagePrice, {
    id: 'Avg. Retail Price',
    header: () => 'Avg. Retail Price',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor((row) => row.wage, {
    id: 'Wage',
    header: () => 'Wage',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor((row) => row.saturationFinal, {
    id: 'Saturation',
    header: () => 'Saturation',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor((row) => 3600 / row.t, {
    id: 'Sold Per Hour',
    header: () => 'Sold Per Hour',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor((row) => (3600 / row.t) * 24, {
    id: 'Sold Per 24 Hours',
    header: () => 'Sold Per 24 Hours',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor((row) => (row.averagePrice - row.price) * (3600 / row.t) - row.wage, {
    id: 'Proft Per Hour Per Level',
    header: () => 'Proft Per Hour Per Level',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor((row) => ((row.averagePrice - row.price) * (3600 / row.t) - row.wage) * 24, {
    id: 'Profit Per 24 Hours',
    header: () => 'Profit Per 24 Hours',
    cell: (info) => info.getValue()
  })
]

export default function Home() {
  const [resourcesData, setResourceData] = useState<ResourceData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://www.simcompanies.com/api/v4/1/resources-retail-info/')
      const resourcesRetailInfo: ResourceRetailInfo[] = await res.json()

      const resourcesData: ResourceData[] = []
      for (const resourceRetailInfo of resourcesRetailInfo) {
        const res = await fetch(`https://www.simcompanies.com/api/v3/market/1/${resourceRetailInfo.dbLetter}/`)
        const offers: ResourceOffer[] = await res.json()

        Array.from(Array(QUALITY_LEVELS).keys()).forEach((quality) => {
          const saturationFinal = calculateSaturation(resourceRetailInfo.saturation, quality)
          const price = offers.find((offer) => offer.quality === quality)?.price

          if (RETAIL_MODELING[1][1][resourceRetailInfo.dbLetter as keyof (typeof RETAIL_MODELING)[1][1]] && price) {
            const t = calculateRetailDemand(
              RETAIL_MODELING[1][1][resourceRetailInfo.dbLetter as keyof (typeof RETAIL_MODELING)[1][1]].xMultiplier,
              RETAIL_MODELING[1][1][resourceRetailInfo.dbLetter as keyof (typeof RETAIL_MODELING)[1][1]]
                .marketSaturationDiv,
              RETAIL_MODELING[1][1][resourceRetailInfo.dbLetter as keyof (typeof RETAIL_MODELING)[1][1]].xOffsetBase,
              RETAIL_MODELING[1][1][resourceRetailInfo.dbLetter as keyof (typeof RETAIL_MODELING)[1][1]].yMultiplier,
              RETAIL_MODELING[1][1][resourceRetailInfo.dbLetter as keyof (typeof RETAIL_MODELING)[1][1]].yOffset,
              price,
              saturationFinal
            )

            resourcesData.push({
              dbLetter: resourceRetailInfo.dbLetter,
              averagePrice: resourceRetailInfo.averagePrice,
              wage: 323,
              saturation: resourceRetailInfo.saturation,
              saturationFinal: saturationFinal,
              quality: quality,
              price: price,
              t: t
            })
          }
        })
      }
      setResourceData(resourcesData)
    }

    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Sim Companies</title>
        <meta name='description' content='Sim Companies' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='min-h-screen bg-gray-100 text-gray-900'>
        <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
          <div className=''>
            <h1 className='text-xl font-semibold'>Economy + Simulation = ❤</h1>
          </div>
          <div className='mt-6'>
            <Table columns={columns} data={resourcesData} />
          </div>
        </main>
      </div>
    </>
  )
}
