export interface ProductFilters {
  trieda?: string[]
  pouzitie?: string[]
  typ_dreva?: string[]
  dlzka_m?: string[]
  cena_m2_s_dph?: string[]
  kusov_v_baliku?: string[]
  kalk_plocha_balika_m2?: string[]
  rozmery_mm?: string[]
  opracovanie_dreva?: string[]
}

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterSection {
  key: keyof ProductFilters
  title: string
  options: FilterOption[]
}

export interface ProductMetadata {
  trieda?: string
  pouzitie?: string
  typ_dreva?: string
  dlzka_m?: string
  cena_m2_s_dph?: string
  kusov_v_baliku?: string
  kalk_plocha_balika_m2?: string
  rozmery_mm?: string
  opracovanie_dreva?: string
  [key: string]: any
}

export interface FilterParams {
  filters: ProductFilters
  sortBy?: string
  page?: number
}

export interface FilterState {
  activeFilters: ProductFilters
  availableFilters: FilterSection[]
  isLoading: boolean
  error?: string
} 