
export const auteurs = [
    { id: 1, nom: 'Salma', bio: 'Développeuse front-end passionnée par React.' },
    { id: 2, nom: 'Yassine', bio: 'Étudiant et créateur de tutoriels JavaScript.' },
    { id: 3, nom: 'Nour', bio: 'Aime partager les bonnes pratiques web.' }
];

export const articles = [
    {
        slug: 'introduction-a-react',
        titre: 'Introduction à React',
        auteurId: 1,
        date: '2026-10-01',
        contenu: 'React permet de construire des interfaces à partir de composants réutilisables.',
        tags: ['react', 'javascript']
    },
    {
        slug: 'comprendre-les-hooks',
        titre: 'Comprendre les hooks',
        auteurId: 2,
        date: '2026-10-05',
        contenu: 'Les hooks donnent accès à l’état et aux effets dans les composants fonctionnels.',
        tags: ['react', 'hooks']
    },
    {
        slug: 'les-tableaux-js',
        titre: 'Les tableaux en JavaScript',
        auteurId: 3,
        date: '2026-10-10',
        contenu: 'map, filter et reduce sont très utiles pour transformer les tableaux.',
        tags: ['javascript']
    },
    {
        slug: 'props-et-composants',
        titre: 'Props et composants',
        auteurId: 1,
        date: '2026-10-11',
        contenu: 'Les props transmettent des données du parent vers l’enfant.',
        tags: ['react']
    },
    {
        slug: 'useeffect',
        titre: 'Découvrir useEffect',
        auteurId: 2,
        date: '2026-10-12',
        contenu: 'useEffect synchronise un composant avec un système externe.',
        tags: ['hooks', 'react']
    },
    {
        slug: 'css-responsive',
        titre: 'CSS responsive',
        auteurId: 3,
        date: '2026-10-13',
        contenu: 'Les grilles fluides facilitent l’adaptation aux écrans.',
        tags: ['css']
    },
    {
        slug: 'async-js',
        titre: 'JavaScript asynchrone',
        auteurId: 2,
        date: '2026-10-14',
        contenu: 'Les promesses et async/await simplifient les appels asynchrones.',
        tags: ['javascript']
    },
    {
        slug: 'accessibilite-web',
        titre: 'Accessibilité web',
        auteurId: 1,
        date: '2026-10-15',
        contenu: 'Des contrôles bien étiquetés rendent le site plus accessible.',
        tags: ['web']
    }
];
