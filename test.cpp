#include <iostream>
#include <math.h>
using namespace std;

//on définit la classe nbComplexe
class nbComplexe
{
    private:
        double reel;
        double imaginaire;
    public:
        nbComplexe(double r, double i);
        nbComplexe();
        double getReel();
        double getImaginaire();
        void setReel(double r);
        void setImaginaire(double i);
        void afficher();
        nbComplexe addition(nbComplexe c);
        nbComplexe soustraction(nbComplexe c);
        nbComplexe multiplication(nbComplexe c);
        nbComplexe division(nbComplexe c);
};
//la fonction qui calcule le discriminant
double discriminant(nbComplexe a, nbComplexe b, nbComplexe c)
{
    double delta;
    delta = (b.getReel()*b.getReel()) - (4*a.getReel()*c.getReel());
    return delta;
}

int main()
{   
    bool iscomplexe = false;
    double a, b, c, delta;
    char t;
    cout << "Selectionnez le type de nombre, R pour réel, C pour complexe" << endl;
    cin >> t;
    //si l'utilisateur entre un caractère autre que R ou C, on lui demande de recommencer
    while(t != 'R' && t != 'C')
    {
        cout << "Erreur, veuillez entrer R ou C" << endl;
        cin >> t;
    }

    //on demande à l'utilisateur de rentrer les valeurs de a, b et c
    cout << "Entrez la valeur de a, b et c" << endl;
    cin >> a >> b >> c;
    
}