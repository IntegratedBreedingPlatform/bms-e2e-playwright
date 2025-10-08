export const TEST_CROP = 'maize';
export const TEST_PROGRAM_NAME = 'Testing Program';
export const TEST_STORAGE_LOCATION = 'Default Seed Store';
export const TEST_BREEDING_LOCATION = 'Philippines';
export const AUTO_GENERATED_TEXT = '(Auto-generated)';

export enum SidebarMenu {
    // Germplasm section
    MANAGE_GERMPLASM = 'Manage Germplasm',

    // Lists section
    GERMPLASM_LISTS = 'Germplasm Lists',
    SAMPLES_LISTS = 'Samples Lists',

    // Studies section
    MANAGE_STUDIES = 'Manage Studies',
    IMPORT_DATASETS = 'Import Datasets',
    SINGLE_SITE_ANALYSIS = 'Single-Site Analysis',
    MULTI_SITE_ANALYSIS = 'Multi-Site Analysis',

    // Inventory section
    MANAGE_INVENTORY = 'Manage Inventory',

    // Queries section
    GRAPHICAL_QUERIES = 'Graphical Queries',
    HEAD_TO_HEAD_QUERY = 'Head to Head Query',
    MULTI_TRAIT_QUERY = 'Multi-Trait Query',

    // Genotyping section (commented in original)
    HIGH_DENSITY = 'High Density',

    // Crop Administration section
    MANAGE_ONTOLOGIES = 'Manage Ontologies',
    MANAGE_CROP_SETTINGS = 'Manage Crop Settings',
    BRAPI_SYNC = 'BrAPI Sync (beta)',

    // Program Administration section
    MANAGE_PROGRAM_SETTINGS = 'Manage Program Settings'
}

// Complementary enum for sidebar tree sections
export enum SidebarSection {
    GERMPLASM = 'Germplasm',
    LISTS = 'Lists',
    STUDIES = 'Studies',
    INVENTORY = 'Inventory',
    QUERIES = 'Queries',
    GENOTYPING = 'Genotyping',
    CROP_ADMINISTRATION = 'Crop Administration',
    PROGRAM_ADMINISTRATION = 'Program Administration'
}
